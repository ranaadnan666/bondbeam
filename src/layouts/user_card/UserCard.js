import React from "react";
import { Link } from "react-router-dom";

const UserCard = (props) => {
  return (
    <>
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to={`/profile/${props?.id}`}
      >
        <div
          key={props?.id}
          style={{
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={props?.profile_pic}
              alt={props?.username}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <div>
              <h4>{props?.first_name}</h4>
              <p>{props?.email}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default UserCard;
