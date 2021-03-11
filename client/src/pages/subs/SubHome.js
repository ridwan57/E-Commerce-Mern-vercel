import React, { useState, useEffect } from "react";
import ProductCard from "../../components/cards/ProductCard";
import { getSub } from "../../functions/sub";


const SubHome = ({ match }) => {
  const [subs, setSubs] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;



  useEffect(() => {
    setLoading(true);
    getSub(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setSubs(res.data.sub);
      setProducts(res.data.products);
      setLoading(false);
    }).catch(err=>{
        setLoading(false)
        console.log(err)
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading...
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {products.length > 0 ? <>{ products.length } Products in {subs.name} Sub category </> : <>No Product  in this Sub category</>} 
            </h4>
          )}
        </div>
      </div>

      <div className="row">
        {products.map((p) => (
          <div className="col-md-4" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubHome;