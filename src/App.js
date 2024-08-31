import { useEffect, useState } from "react";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";

import { ApiServices } from "./api/api_services";
import Login from "./Login";
import { Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Loader from "./component/Loader";

function App() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [newItem, setNewItem] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false)

  const [isname, setIsName] = useState("")
  let token;
  let name;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token")
    name = localStorage.getItem("name")
  }
  console.log("token", token)
  useEffect(() => {
    if (token) {
      setIsLogin(true)
      setIsName(name)
    } else {
      setIsLogin(false)
      setIsName("")
    }
  }, [token])

  const fetchitem = async () => {
    setIsLoading(true)
    ApiServices.getItems().then((res) => {
      console.log(res)
      if (res.response_code === 200) {
        setItems(res.items);
      }
      setIsLoading(false)
    }).catch((err) => {
      setIsLoading(false)
      setFetchError(err.message)
    })
  };

  useEffect(() => {
    fetchitem()
  }, []);

  const handleCheck = async (id) => {
    ApiServices.updateItem(id).then((res) => {
      console.log(res)
      if (res.response_code === 200) {
        fetchitem()
      }
    }).catch((err) => {
      setFetchError(err.message)
    })
  };

  const handleDelete = async (id) => {
    ApiServices.deleteItem(id).then((res) => {
      console.log(res)
      if (res.response_code === 200) {
        fetchitem()
      }
    }).catch((err) => {
      setFetchError(err.message)
    })

  };



  const addItem = async (item) => {

    const data = {
      Item: item
    }
    ApiServices.postItem(data).then((res) => {
      console.log(res)
      if (res.response_code === 200) {
        fetchitem()
      }
    }).catch((err) => {
      setFetchError(err.message)
    })

  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  return (
    <div className="App">
      <Header title={isname} login={isLogin} setLogin={setIsLogin} />
      {isLogin ?
        (
          <>
            <AddItem
              newItem={newItem}
              setNewItem={setNewItem}
              handleSubmit={handleSubmit}
            />
            <SearchItem search={search} setSearch={setSearch} />
            <main>
              {fetchError && <p>{`Error:${fetchError}`}</p>}
              {isLoading && <Loader />}
              {!isLoading && !fetchError && (
                <Content
                  items={items.filter((item) =>
                    item.Item.toLowerCase().includes(search.toLowerCase())
                  )}
                  handleCheck={handleCheck}
                  handleDelete={handleDelete}
                />
              )}
            </main>
          </>
        ) : (
          <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

          </Routes>

        )
      }

      <Footer length={items.length} />
    </div>
  );
}

export default App;
