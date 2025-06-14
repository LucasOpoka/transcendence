import AbstractView from "./AbstractView.js";

export default class extends AbstractView
{
    constructor(params)
    {
    super(params);
    }

    async fetchStatsData()
    {
        try
        {
            var response = await fetch("pong_api/pong_stats_data/", {method: "GET"});
            if (!response.ok)
                throw new Error("Failed to fetch statistics data");
            return await response.json();
        }
        catch(err)
        {
            console.error(err.message);
            if (response.status === 401)
                this.goToNoAuth();
            else
                this.goToError();
            throw err;
        }
    }

    async goToView()
    {
    try {var json = await this.fetchStatsData();}
    catch (err) {return;}

    console.log(json)

    var content = `
    <div class="container mb-5">
        <div class="stats-card">
            <div class="card-body text-center" style="padding: 20px;">
                <h4 class="card-title mb-3" style="color: #005252;">📊 Statistics</h4>
                <p class="card-text"><span class="fw-bold" style="color: #005252;">Total games played:</span> ${json.data["total_games"]}</p>
                <p class="card-text"><span class="fw-bold" style="color: #005252;">Registered users:</span> ${json.data["user_names"]}</p>
            </div>
        </div>
    </div>
    `;

    this.setTitle("Statistics");
    this.unhideNavbar();
    await this.setContent(content);
    }
}

