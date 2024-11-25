export default function RequestProfileData() {
  // Silently acquires an access token which is then attached to a request for MS Graph data
  instance
    .acquireTokenSilent({
      ...loginRequest,
      account: accounts[0]
    })
    .then((response) => {
      // console.log(response);
      setUser(response);
      callMsGraph(response.accessToken).then((response) =>
        setGraphData(response)
      );
    });
}
