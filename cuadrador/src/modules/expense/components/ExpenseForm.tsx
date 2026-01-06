import { useState } from 'react';

type Props = {
    onSubmit: (data: {
        description: string;
        amount: number;
        category: string;
        billType: string;
    }) => void;
};

export function ExpenseForm({ onSubmit }: Props) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [billType, setBillType] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ description, amount, category, billType });
    };

    return (
        <>
            <h2>Agregar Gasto</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Descripción" onChange={e => setDescription(e.target.value)} />
                <input type="number" placeholder="Monto" onChange={e => setAmount(Number(e.target.value))} />
                <input placeholder="Categoría" onChange={e => setCategory(e.target.value)} />
                <input placeholder="Tipo Gasto" onChange={e => setBillType(e.target.value)} />
                <button type="submit">Agregar</button>
            </form>
        </>
    );
}
