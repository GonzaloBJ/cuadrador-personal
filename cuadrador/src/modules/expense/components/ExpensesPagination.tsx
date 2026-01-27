type Props = {
    page: number;
    setPage: (page: number | ((prevPage: number) => number)) => void;
};

export function ExpensesPagination({ page, setPage }: Props) {
    return (
        <>
            <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
            >
                Anterior
            </button>

            <button
                onClick={() => setPage((p) => p + 1)}
            >
                Siguiente
            </button>
        </>
    );
}