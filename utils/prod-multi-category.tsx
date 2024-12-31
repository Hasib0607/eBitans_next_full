import Link from 'next/link';

const ProdMultiCategory = ({ product, design }: any) => {
    return (
        <>
            {Array.isArray(product?.category) &&
                product?.category?.length > 0 && (
                    <div className="flex items-center gap-2">
                        <p className="capitalize">
                            {' '}
                            <span className="text-black">Category: </span>{' '}
                        </p>
                        {product?.category?.map((cat: any, index: number) => {
                            <Link
                                href={'/category/' + cat?.id}
                                style={{
                                    color: design?.header_color,
                                }}
                                key={index}
                            >
                                {cat?.name}
                            </Link>;
                            {
                                index < product?.category?.length - 1 && ',';
                            }
                            {
                                (' ');
                            }
                        })}
                    </div>
                )}
        </>
    );
};

export default ProdMultiCategory;