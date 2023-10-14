import { useState, useRef } from "react";
import "./b.css";

const valsObj = { name: "", rate: "", dur: "" };

const Main = () => {
  const [vals, setVals] = useState(valsObj);
  const [movies, setmovies] = useState([]);
  let isval = (vals.name.length>0 & vals.rate.length>0 & vals.dur.length>0);//*
  console.log(vals.name.length)
  const inp1Ref = useRef(null);
  const handleName = (e) => setVals({ ...vals, name: e.target.value });
  const handleRate = (e) =>
    e.target.value <= 10 &&
    e.target.value.length <= 3 &&
    setVals({ ...vals, rate: e.target.value });
  const handleDur = (e) =>
    isNaN(e.target.value) === false &&
    setVals({ ...vals, dur: e.target.value });
  const makeMovieArr = () => {
    isval && setmovies([...movies, vals]);
    setVals(valsObj);
    inp1Ref.current.focus()
  };
  const [srchVal, setSrchVal] = useState("");

  let timeoutId;
  const handleSearch = (e) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setSrchVal(e.target.value);
    }, 500);
  };
  const filteredArr = movies.filter((m) =>
    m.name
      .toLowerCase()
      .replaceAll(" ", "")
      .includes(srchVal.toLowerCase().replaceAll(" ", ""))
  );
  //console.log(filteredArr);
  //let isVal = vals.name;
  //console.log(vals);
  return (
    <>
      
      <div className="center">
      <h1>Favorite Movies</h1>
      </div>
      <div className="flex">
        <div>
      <form>
        <input
          type="text"
          placeholder="Movie name"
          value={vals.name}
          onChange={handleName}
          ref={inp1Ref}
          autoFocus='on'
        />
        <input
          type="text"
          placeholder="Rate( 1 to 10 )"
          value={vals.rate}
          onChange={handleRate}
        />
        <input
          type="text"
          placeholder="Duration( min )"
          value={vals.dur}
          onChange={handleDur}
          onKeyDown={(e)=>{if(e.key==="Enter" & isval){makeMovieArr()}} }
        />
      </form>
      <button onClick={makeMovieArr} disabled={!isval}>
        Add
      </button>

      <form>
        <input type="text" placeholder="Search trough your movies" onChange={handleSearch} />
      </form>

      
       </div>
      </div>
      
        <div className="lis">
        {filteredArr.length === 0 && srchVal.replaceAll(" ", "") && (<h2>Not found</h2>) }
        
        {(srchVal.replaceAll(" ", "") ? filteredArr : movies).map((a) => {
          return (
            
              <div className='dli'>
                <h1>{a.name}</h1>
                <h3>{`IMDb: ${a.rate}/10`}</h3>
                <h4>{`${a.dur} min(s)`}</h4>
              </div>
              
            
          );
        })}
        </div>
      
    </>
  );
};

export default Main;
