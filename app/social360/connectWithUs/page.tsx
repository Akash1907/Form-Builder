"use client";
import Card from "./Cards";
import Cards from "./Cards1";
import Cardss from "./Cards2";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://164.52.200.229:9486/interactions"
        );
        setData(response.data);
        console.log(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <h2 className=" flex justify-center font-bold text-3xl mt-5">
        Connect With Us!
      </h2>
      <Card data={data.total_calls} />
    </main>
  );
};

export default Page;
