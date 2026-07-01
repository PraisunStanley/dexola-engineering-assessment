import React, { useEffect, useState } from "react";
import { useData } from "../state/DataContext";
import { Link } from "react-router-dom";
import { FixedSizeList as List } from "react-window";

function Items() {
  const { items, total, fetchItems } = useData();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const limit = 20;

  useEffect(() => {
    const controller = new AbortController();

    fetchItems({
      page,
      limit,
      q: search,
      signal: controller.signal,
    }).catch((err) => {
      if (err.name !== "AbortError") {
        console.error(err);
      }
    });

    return () => controller.abort();
  }, [page, search, fetchItems]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            marginBottom: "10px",
            color: "#222",
          }}
        >
          📦 Product Inventory
        </h1>

        <p
          style={{
            color: "#777",
            marginBottom: "25px",
          }}
        >
          Browse products with server-side search & pagination
        </p>

        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          style={{
            width: "100%",
            padding: "14px 18px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            fontSize: "16px",
            outline: "none",
            marginBottom: "25px",
          }}
        />

        {!items.length ? (
          <div
            style={{
              textAlign: "center",
              padding: "30px",
              color: "#888",
            }}
          >
            Loading items...
          </div>
        ) : (
          <List
            height={350}
            width={740}
            itemCount={items.length}
            itemSize={70}
          >
            {({ index, style }) => {
              const item = items[index];

              return (
                <div
                  style={{
                    ...style,
                    padding: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "#fff",
                      borderRadius: "12px",
                      border: "1px solid #eee",
                      padding: "15px 20px",
                      boxShadow: "0 5px 15px rgba(0,0,0,.05)",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "18px",
                        }}
                      >
                        <Link
                          to={`/items/${item.id}`}
                          style={{
                            textDecoration: "none",
                            color: "#2563eb",
                          }}
                        >
                          {item.name}
                        </Link>
                      </h3>

                      <p
                        style={{
                          margin: "6px 0 0",
                          color: "#777",
                          fontSize: "14px",
                        }}
                      >
                        Category: {item.category}
                      </p>
                    </div>

                    <div
                      style={{
                        fontWeight: "bold",
                        color: "#16a34a",
                        fontSize: "18px",
                      }}
                    >
                      ${item.price}
                    </div>
                  </div>
                </div>
              );
            }}
          </List>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "25px",
          }}
        >
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "8px",
              background: "#2563eb",
              color: "#fff",
              cursor: "pointer",
              opacity: page === 1 ? 0.5 : 1,
            }}
          >
            ← Previous
          </button>

          <div
            style={{
              fontWeight: "600",
              color: "#555",
            }}
          >
            Page {page} of {Math.ceil(total / limit)}
          </div>

          <button
            disabled={page >= Math.ceil(total / limit)}
            onClick={() => setPage((p) => p + 1)}
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "8px",
              background: "#2563eb",
              color: "#fff",
              cursor: "pointer",
              opacity:
                page >= Math.ceil(total / limit)
                  ? 0.5
                  : 1,
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Items;