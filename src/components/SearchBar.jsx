function SearchBar({ city, setCity, onSearch, history, onClearHistory }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch();
    };
    return (
        <div>
            <form className="search-bar" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Város neve..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button type="submit">Keresés</button>
            </form>
            {history.length > 0 && (
                <>
                    <div className="history">
                        {history.map((item) => (
                            <button
                                key={item}
                                className="history-item"
                                onClick={() => {
                                    setCity(item);
                                    onSearch(item);
                                }}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    <button className="clear-history" onClick={onClearHistory}>
                        🗑️ Előzmények törlése
                    </button>
                </>
            )}
        </div>
    );
}

export default SearchBar;
