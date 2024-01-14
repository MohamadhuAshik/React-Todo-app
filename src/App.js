import { useEffect, useState } from "react";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";
import api from "./api/items";

function App() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [newItem, setNewItem] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = "http://localhost:3500/items";

  useEffect(() => {
    const fetchitem = async () => {
      try {
        const response = await api.get("/items");
        setItems(response.data);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      (async () => await fetchitem())();
    }, 2000);
  }, []);

  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);

    const updateOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/items/${id}`);
      const delItem = items.filter((item) => item.id !== id);
      setItems(delItem);
    } catch (err) {
      setFetchError(err.message);
    }
    /* 
    const deleteOptions = {
      method:"DELETE"
    }
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl,deleteOptions);
    if (result) setFetchError(result); */
  };

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id, checked: false, item };

    try {
      const response = await api.post("/items", addNewItem);
      const listItems = [...items, response.data];
      setItems(listItems);
    } catch (err) {
      setFetchError(err.message);
    }

    /* const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify(addNewItem)
    }
    const result = await apiRequest(API_URL , postOptions);
    if (result) setFetchError(result); */
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  return (
    <div className="App">
      <Header />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {fetchError && <p>{`Error:${fetchError}`}</p>}
        {isLoading && <p>Data Loading...</p>}
        {!isLoading && !fetchError && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
