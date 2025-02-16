
async function register_button()
{
    await register_func
    (
      document.getElementById("register_user").value,
      document.getElementById("register_pwd").value
    );
};

async function register_func(user, pwd)
{
    try
    {
        const response = await fetch("pong_api/pong_register/", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: user, password: pwd,})});

        if (!response.ok) {throw new Error("Failed to register");}
    }

    catch (error) {console.error(error.message);}
};

async function login_button()
{
    await login_func
    (
      document.getElementById("login_user").value,
      document.getElementById("login_pwd").value
    );
};

async function login_func(user, pwd)
{
    try
    {
        const response = await fetch("pong_api/pong_login/", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: user, password: pwd})});

        if (!response.ok) {throw new Error("Failed to login");}
    }
    catch (error) {console.error(error.message);}
};