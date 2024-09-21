

const Prayers = (props) => {

    const { prayerCategories } = props;

    return (
        <>
            <h1>List of Prayers</h1>
            <p>Our list of prayers and categories coming soon!</p>
            <p>{props.prayerCategories.join(', ')}</p>
            <p></p>
            <ul>
                {prayerCategories.map((prayer, index) => (
                    <li>{prayer}</li>
                ))}
            </ul>

        </>
    )
}

export default Prayers;