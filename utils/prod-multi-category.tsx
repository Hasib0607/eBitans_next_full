import Link from 'next/link';
import React from 'react';
const ProdMultiCategory = ({ category, classes, color }: any) => {
    return (
        <>
            {category?.map((cat: any, index: number) => (
                <span key={index} className={classes}>
                    <Link
                        href={'/category/' + cat.id}
                        style={{
                            color: color ? color : "#212121",
                        }}
                    >
                        {cat.name}
                    </Link>
                    {index < category.length - 1 && ', '}
                </span>
            ))}
        </>
    );
};
export default ProdMultiCategory;