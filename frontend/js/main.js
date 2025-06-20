function chkUser()
{
   const value = localStorage.getItem("currentUser");
    console.log("currentUser: "+ value);
    if(!value){
      alert("로그인이 필요합니다.");
      document.location.href("index.html");
    }
}

function login()
{
  const id = document.getElementById("id").value;
  const pwd = document.getElementById("pwd").value;

  for(let i=0; i<=users.length ;i++){
    //배열에 있는 ID와 입력한 ID비교 
    if(users[i]['email']===id && users[i]['password']===pwd) // 로그인성공
    { 
      console.log("로그인성공")

      localStorage.setItem("currentUser", id);// 세션저장
      const value = localStorage.getItem("currentUser");
      if(value){
        console.log("currentUser: "+ value);
      }
      //document.location.href("todo.html");
    }
    else //로그인 실패
    {
      document.getElementById('error-message').textContent = "아이디와 비밀번호가 일치하지 않습니다.";
    }
  }
  
}