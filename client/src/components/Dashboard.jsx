import React, { useContext, useEffect, useState } from "react";
import "./mix.css";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Dashboard = () => {
  const { logindata, setLoginData } = useContext(LoginContext);

  const [data, setData] = useState(false);

  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();

    if (data.status === 401 || !data) {
      history("*");
    } else {
      console.log("user verify");
      setLoginData(data);
      history("/dash");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 2000);
  }, []);

  return (
    <>
      {
        // data ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        //     <img src="./man.png" style={{ width: "200px", marginTop: 20 }} alt="" />
        //     <h1>User Email:{logindata ? logindata.ValidUserOne.email : ""}</h1>
        // </div> : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
        //     Loading... &nbsp;
        //     <CircularProgress />
        // </Box>

        data ? <div className="container emp-profile">
          <form method="">
            <div className="row">
              <div className="col-md-4">
                <img src="./man.png" alt="" height="250px" width="250px" />
              </div>
              <div className="col-md-8 pl-5">
                <div className="profile-head">
                  <h5>{logindata ? logindata.ValidUserOne.fname : ""}</h5>
                  <h6>{logindata ? logindata.ValidUserOne.work : ""}</h6>
                  <p className="profile-rating mt-3">
                    Rankings <span>1/10</span>
                  </p>
                </div>
                <div className="row">
                  <div className="col-md-5">
                    <label>User ID</label>
                  </div>
                  <div className="col-md-5">
                    <p>{logindata ? logindata.ValidUserOne._id : ""}</p>
                  </div>
                  <div className="col-md-5">
                    <label>Name</label>
                  </div>
                  <div className="col-md-5">
                    <p>{logindata ? logindata.ValidUserOne.fname : ""}</p>
                  </div>
                  <div className="col-md-5">
                    <label>Email</label>
                  </div>
                  <div className="col-md-5">
                    <p>{logindata ? logindata.ValidUserOne.email : ""}</p>
                  </div>
                  <div className="col-md-5">
                    <label>phone</label>
                  </div>
                  <div className="col-md-5">
                    <p>{logindata ? logindata.ValidUserOne.phone : ""}</p>
                  </div>
                  <div className="col-md-5">
                    <label>Work</label>
                  </div>
                  <div className="col-md-6">
                    <p>{logindata ? logindata.ValidUserOne.work : ""}</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div> : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    Loading... &nbsp;
                   <CircularProgress />
                 </Box>
      }
    </>
  );
};

export default Dashboard;
