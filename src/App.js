import "./styles.css";
import { useEffect, useReducer } from "react";

//'actions object' this is a global non changing variable, instead of passing strings that could lead to errors
const ACTIONS = {
  FETCH_INIT: "call-api",
  FETCH_SUCCESS: "success",
  FETCH_FAILURE: "error"
};

//declare clothingReducer
const clothingReducer = (state, action) => {
  console.log("state", state);
  switch (action.type) {
    case ACTIONS.FETCH_INIT:
      //{data: Array(0), isLoading: false, isError: false}
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case ACTIONS.FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
};

export default function App() {
  // const [clothing, setClothing] = useState([]);
  const [clothing, dispatchClothing] = useReducer(clothingReducer, {
    data: [],
    isLoading: false,
    isError: false
  });
  const url = "https://fakestoreapi.com/products/";

  function getData(url) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((response) =>
        dispatchClothing({ type: ACTIONS.FETCH_SUCCESS, payload: response })
      )
      .catch(() => dispatchClothing({ type: ACTIONS.FETCH_FAILURE }));
  }
  useEffect(() => {
    dispatchClothing({ type: ACTIONS.FETCH_INIT });
    //use the new dispatch function for state transitions
    getData(url);
  }, []);

  return (
    <>
      {clothing.isError && <p>Something went wrong ...</p>}
      <hr />
      {clothing.isLoading ? (
        <p>loading</p>
      ) : (
        clothing.data.map((item) => <li key={item.id}>{item.title}</li>)
      )}
    </>
  );
}
