import React from "react";

/**
 * Renders information about the user obtained from MS Graph
 * @param props
 */
export const ProfileData = (props) => {
  console.log("test-=----------");
  console.log(props.graphData.account.username);

  return (
    <div id="profile-div">
      <p>
        <strong>Username</strong> {props.graphData.account.username}
      </p>
      <p>
        <strong>First Name: </strong> {props.graphData.givenName}
      </p>
      <p>
        <strong>Last Name: </strong> {props.graphData.surname}
      </p>
      <p>
        <strong>Email: </strong> {props.graphData.userPrincipalName}
      </p>
      <p>
        <strong>Id: </strong> {props.graphData.id}
      </p>
    </div>
  );
};
