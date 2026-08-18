function VehicleFilters({ filter, onFilterChange}) {
    return (
        <div>
            <button type="button" onClick={() => onFilterChange('all')}>
                All
            </button>
            <button type="button" onClick={() => onFilterChange('available')}>
                Available
            </button>
            <button type="button" onClick={() => onFilterChange('unavailable')}>
                Unavailable
            </button>
            <p>Current filter: {filter}</p>
        </div>
    )
}

export default VehicleFilters