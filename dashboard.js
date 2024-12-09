async function fetchDashboardData() {
    try {
        const response = await fetch('https://infobencanajkmv2.jkm.gov.my/api/data-dashboard-aliran-trend-balik.php?a=0&b=0&seasonmain_id=208&seasonnegeri_id=');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayDashboard(data);
    } catch (error) {
        document.getElementById('dashboard').innerHTML = `
            <div class="error">
                Error loading dashboard data. Please try again later.
            </div>
        `;
        console.error('Error:', error);
    }
}

function displayDashboard(data) {
    const dashboard = document.getElementById('dashboard');
    let dashboardHTML = '';

    // Process and display the data
    if (data && Array.isArray(data)) {
        data.forEach(item => {
            dashboardHTML += `
                <div class="card">
                    <h2>${item.negeri || 'Unknown Location'}</h2>
                    <div class="stat">
                        Mangsa: ${item.jumlah_mangsa || '0'}
                    </div>
                    <div>
                        Pusat Pemindahan: ${item.jumlah_ppl || '0'}
                    </div>
                </div>
            `;
        });
    }

    dashboard.innerHTML = dashboardHTML || '<div class="error">No data available</div>';
    
    // Update timestamp
    const timestamp = new Date().toLocaleString('en-MY');
    document.getElementById('lastUpdate').textContent = `Last Updated: ${timestamp}`;
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Fetch data when page loads
    fetchDashboardData();

    // Refresh data every 5 minutes
    setInterval(fetchDashboardData, 300000);
});
