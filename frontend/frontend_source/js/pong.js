
async function push_game(w1, w2, l1, l2, score)
{
    try
    {
        const response = await fetch("pong_api/pong_push_game/", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({winner1: w1, winner2: w2, loser1: l1, loser2: l2, score: score})});

        if (!response.ok) {throw new Error("Failed to push game");}
    }
    catch (error) {console.error(error.message);}
};


function play_pong(player_left, player_right)
{
    // Temporary hard coded values
    player_left = "Player 1";
    player_right = "Player 2";

    const canvas = document.getElementById('pong');
    const context = canvas.getContext('2d');
    const grid = 15;
    const paddleHeight = grid * 5;
    const maxPaddleY = canvas.height - grid - paddleHeight;

    var paused = false;
    var end = false;
    var score = [0,0];
    var max_score = 5;


    var paddleSpeed = 6;
    var ballSpeed = 5;

    var requestId;

    const leftPaddle =
    {
        x: grid * 0,
        y: (canvas.height - paddleHeight) / 2,
        width: grid,
        height: paddleHeight,
        dy: 0
    };

    const rightPaddle =
    {
        x: canvas.width - grid * 1,
        y: (canvas.height - paddleHeight) / 2,
        width: grid,
        height: paddleHeight,
        dy: 0
    };

    const ball =
    {
        x: canvas.width / 2,
        y: canvas.height / 2,
        width: grid,
        height: grid,
        resetting: false,
        dx: ballSpeed,
        dy: -ballSpeed
    };

    function collides(obj1, obj2)
    {
        return obj1.x < obj2.x + obj2.width &&
                obj1.x + obj1.width > obj2.x &&
                obj1.y < obj2.y + obj2.height &&
                obj1.y + obj1.height > obj2.y;
    }


    // Pong loop
    function loop()
    {
        canvas.focus();

        if (end)
            return;

        context.clearRect(0,0,canvas.width,canvas.height);
        context.fillStyle = 'black';
        context.fillRect(0,0,canvas.width,canvas.height);
        
        context.textAlign = 'center', context.font = '50px "Press Start 2P", Arial, sans-serif', context.fillStyle = 'white';
        context.fillText(score[0] + '  ' + score[1], canvas.width / 2, canvas.height * 0.2);

        // Move paddles
        leftPaddle.y += leftPaddle.dy;
        rightPaddle.y += rightPaddle.dy;

        // Check paddles out of bounds
        if (leftPaddle.y < grid)
            leftPaddle.y = grid;
        else if (leftPaddle.y > maxPaddleY)
            leftPaddle.y = maxPaddleY;

        if (rightPaddle.y < grid)
            rightPaddle.y = grid;
        else if (rightPaddle.y > maxPaddleY)
            rightPaddle.y = maxPaddleY;

        // draw paddles
        context.fillStyle = 'white';
        context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
        context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

        // move ball by its velocity
        ball.x += ball.dx;
        ball.y += ball.dy;

        // prevent ball from going through walls by changing its velocity
        if (ball.y < grid)
        {
            ball.y = grid;
            ball.dy *= -1;
        }
        else if (ball.y + grid > canvas.height - grid)
        {
            ball.y = canvas.height - grid * 2;
            ball.dy *= -1;
        }

        // reset ball if it goes past paddle (but only if we haven't already done so)
        if ( (ball.x < 0 || ball.x > canvas.width) && !ball.resetting)
        {
            ball.resetting = true;
            if (ball.x > canvas.width)
                score[0]++;
            else
                score[1]++;

            ballSpeed = 5;

            if (score[0] === max_score || score[1] === max_score)
            {
                window.cancelAnimationFrame(requestId);
                var score_str = score[0].toString() + " - " + score[1].toString();

                if (score[0] > score[1])
                    push_game(player_left, null, player_right, null, score_str);
                else
                    push_game(player_right, null, player_left, null, score_str);

                console.log("Game ended, result: " + score_str + "\n");
                document.querySelector("#app").innerHTML = "Game ended, result: " + score_str;
                return;
            }

            // give some time for the player to recover before launching the ball again
            setTimeout(() => {
                ball.resetting = false;
                ball.x = canvas.width / 2;
                ball.y = canvas.height / 2;
                }, 400);
        }

        // check to see if ball collides with paddle. if they do change x velocity
        if (collides(ball, leftPaddle))
        {
            ball.dx *= -1;
            ball.x = leftPaddle.x + leftPaddle.width; // move ball otherwise collision happens next frame
            ballSpeed += 1
        }
        else if (collides(ball, rightPaddle))
        {
            ball.dx *= -1;
            ball.x = rightPaddle.x - ball.width; // move ball otherwise collision happens next frame
            ballSpeed += 1
        }

        // ball
        context.fillRect(ball.x, ball.y, ball.width, ball.height);

        // walls
        context.fillStyle = 'orange';
        context.fillRect(0, 0, canvas.width, grid);
        context.fillRect(0, canvas.height - grid, canvas.width, canvas.height);

        // dotted line
        for (let i = grid; i < canvas.height - grid; i += grid * 2)
        {
            context.fillRect(canvas.width / 2 - grid / 2, i, grid, grid);
        }

        requestId = window.requestAnimationFrame(loop);
    }

    document.addEventListener('keydown',
        function(e)
        {
            if (e.key === "ArrowUp")
                rightPaddle.dy = -paddleSpeed;
            else if (e.key === "ArrowDown")
                rightPaddle.dy = paddleSpeed;

            if (e.key === "w")
                leftPaddle.dy = -paddleSpeed;
            else if (e.key === "s")
                leftPaddle.dy = paddleSpeed;

            if (e.key === "Enter")
            {
                paused = !paused;
                if (paused)    
                    window.cancelAnimationFrame(requestId);
                else
                    requestId = window.requestAnimationFrame(loop);
            }
            if (e.key === "e")
                end = true;
        }
    );

    document.addEventListener('keyup',
        function(e)
        {
            if (e.key === "ArrowUp" || e.key === "ArrowDown")
                rightPaddle.dy = 0;

            if (e.key === "w" || e.key === "s")
                leftPaddle.dy = 0;
        }
    );

    requestId = window.requestAnimationFrame(loop);
}