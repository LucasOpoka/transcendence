
function play_pong()
{

    const canvas = document.getElementById('pong');
    const context = canvas.getContext('2d');
    const grid = 15;
    const paddleHeight = grid * 5;
    const maxPaddleY = canvas.height - grid - paddleHeight;

    var paused = 0;
    var score = [0,0];


    var paddleSpeed = 6;
    var ballSpeed = 5;

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

    // Game loop
    function loop()
    {
        requestAnimationFrame(loop);

        if (paused)
            return;

        // Reset canvas
        context.clearRect(0,0,canvas.width,canvas.height);
        context.fillStyle = 'black';
        context.fillRect(0,0,canvas.width,canvas.height);
        
        context.textAlign = 'center', context.font = '50px "Press Start 2P", Arial, sans-serif', context.fillStyle = 'white';
        context.fillText(score[1] + '  ' + score[0], canvas.width / 2, canvas.height * 0.2);

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
            if (ball.x < 0)
                score[0]++;
            else
                score[1]++;

            ballSpeed = 5;

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

        // draw ball
        context.fillRect(ball.x, ball.y, ball.width, ball.height);

        // draw walls
        context.fillStyle = 'orange';
        context.fillRect(0, 0, canvas.width, grid);
        context.fillRect(0, canvas.height - grid, canvas.width, canvas.height);

        // draw dotted line down the middle
        for (let i = grid; i < canvas.height - grid; i += grid * 2)
        {
            context.fillRect(canvas.width / 2 - grid / 2, i, grid, grid);
        }
    }

    // listen keydown
    document.addEventListener('keydown',
    function(e)
    {
        // up and down
        if (e.which === 38)
            rightPaddle.dy = -paddleSpeed;
        else if (e.which === 40)
            rightPaddle.dy = paddleSpeed;

        // w and a
        if (e.which === 87)
            leftPaddle.dy = -paddleSpeed;
        else if (e.which === 83)
            leftPaddle.dy = paddleSpeed;

        // pause
        if (e.which === 13)
            paused = (paused + 1) % 2;
    }
    );

    // listen keyup
    document.addEventListener('keyup',
    function(e)
    {
        if (e.which === 38 || e.which === 40)
            rightPaddle.dy = 0;

        if (e.which === 83 || e.which === 87)
            leftPaddle.dy = 0;
    }
    );

    // start the game
    requestAnimationFrame(loop);
}