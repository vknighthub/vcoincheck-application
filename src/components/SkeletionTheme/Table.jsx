import React from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'


const SkeletionThemeTable = () => {
    return (
        <>
            <SkeletonTheme
                baseColor="#5294e0"
                highlightColor="#96c7ff"
                borderRadius="0.5rem"
                duration={4}
            >
                <table className="table">
                </table>
            </SkeletonTheme>
        </>
    )
}

export default SkeletionThemeTable