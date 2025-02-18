import {useState, useContext, useEffect} from "react";
import {UserContext} from "../../../context/user-context";
import Table from "../table/table.jsx";

const tableHead = {
    name: "Имя пакета",
    owner: "Владелец",
    task_type: "Проект",
    is_educational: "Образовательный",
    created_at: "Дата создания"
};

const BatchAll = () => {
    const [token] = useContext(UserContext);
    const [batchList, setBatchList] = useState([]);
    const [taskTypeCache, setTaskTypeCache] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const countPerPage = 10;

    const fetchTaskType = async (taskTypeId) => {
        if (taskTypeCache[taskTypeId]) {
            return taskTypeCache[taskTypeId];
        }

        try {
            const requestOptions = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch(`/api/v1/task-type/${taskTypeId}`, requestOptions);
            const result = await response.json();

            if (response.ok) {
                setTaskTypeCache((prevCache) => ({
                    ...prevCache,
                    [taskTypeId]: result.name,
                }));
                return result.name;
            } else {
                throw new Error("Ошибка загрузки task_type");
            }
        } catch (err) {
            return "Неизвестный тип";
        }
    };

    const fetchBatches = async (page) => {
        setLoaded(true);
        setError(null);

        try {
            const requestOptions = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch(`/api/v1/batch?page=${page}&size=${countPerPage}`, requestOptions);
            const result = await response.json();

            if (response.ok) {
                const enrichedBatches = await Promise.all(
                    result.batches.map(async (batch) => ({
                        ...batch,
                        task_type: await fetchTaskType(batch.task_type), // Загружаем имя task_type
                    }))
                );

                setBatchList(enrichedBatches);
                setHasNextPage(result.batches.length === countPerPage);
            } else {
                throw new Error("Ошибка загрузки данных");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoaded(false);
        }
    };

    useEffect(() => {
        fetchBatches(currentPage);
    }, [currentPage]);

    return (
        <Table
            tableHead={tableHead}
            data={batchList}
            isLoading={loaded}
            currentPage={currentPage}
            hasNextPage={hasNextPage}
            onPageChange={setCurrentPage}
            error={error}
        />
    );
};

export default BatchAll;
