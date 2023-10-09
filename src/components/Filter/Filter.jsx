import styles from './Filter.module.css'

function Filter({ handleCategoryClick, selectedCategory, categories, isLoading }) {

    //Creating unique Category Array
    const uniqueCategories = [...new Set(categories.flat())]
    return (
        <div className={styles.filterContainer} >

            {/* Up */}
            <div className={styles.filterUpBox}>
                <h4>Feedback</h4>
                <p>Apply Filter</p>
            </div>

            <h5>Filters:</h5>

            {/* Down */}
            <div className={styles.filterDownBox}>
                {isLoading ?
                    <>
                        <p className={styles.filterTagLoading} />
                        <p className={styles.filterTagLoading} />
                        <p className={styles.filterTagLoading} />
                        <p className={styles.filterTagLoading} />
                    </> :
                    <>
                        <p className={`${styles.filterTags}  ${selectedCategory === '' && styles.active}`} onClick={() => handleCategoryClick('')}>All</p>

                        {uniqueCategories.map((category) => {
                            return <p key={category} className={`${styles.filterTags} ${selectedCategory === category && styles.active}`}
                                onClick={() => handleCategoryClick(category)}>{category}</p>
                        })}
                    </>
                }
            </div>
        </div>
    )
}

export default Filter;