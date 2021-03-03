import {Card} from "react-bootstrap";
import {useEffect, useState} from "react";

export default function Category() {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch('/categories/',).then(data => data.json()).then((data) => {
            const keys = Object.keys(data);
            const categories = [];
            for (let i of keys){
                categories.push({key: i, img: data[i]})
            }
            setProduct(categories);
        });
    }, []);

    return <>
        {product && product.map(value => {
            return (
                <Card style={{width: '18rem'}} key={value.key}>
                    <Card.Img variant="top" src={value.img}/>
                    <Card.Body>
                        <Card.Title>{value.key}</Card.Title>

                    </Card.Body>
                </Card>

            )
        })}
    </>
}