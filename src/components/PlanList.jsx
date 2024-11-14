import Link from 'next/link';

const PlanList = () => {
    const plans = [
        { id: '30mins', label: '30 mins Plan' },
        { id: '1hour', label: '1 Hour Plan' },
        { id: '1.5hour', label: '1.5 Hour Plan' },
        { id: '2hour', label: '2 Hour Plan' }
    ];

    return (
        <div>
            {plans.map((plan) => (
                <div key={plan.id}>
                    <Link href={`/bible-study/${plan.id}`}>
                        {plan.label}
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default PlanList;
