// Sample data - In a real application, this would come from your backend
const assets = [
    {
        name: 'Rupiah',
        type: 'Fiat',
        amount: '50000',
        value: 50000,
        symbol: 'IDR'
    },
    {
        name: 'Bitcoin',
        type: 'Digital',
        amount: '0.00003202',
        value: 50000, // Example value in IDR
        symbol: 'BTC'
    },
    
];

// Calculate total value
const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

// Update total amount display
document.getElementById('totalAmount').textContent = 
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(totalValue);

// Create pie chart
const ctx = document.getElementById('assetsChart').getContext('2d');
new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: assets.map(asset => asset.name),
        datasets: [{
            data: assets.map(asset => asset.value),
            backgroundColor: [
                '#4d7c0f',
                '#f59e0b',
                '#0891b2',
                '#7c3aed'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            },
            title: {
                display: true,
                text: 'Asset Distribution'
            }
        }
    }
});

// Ganti fungsi getRandomColor dan getInitials dengan fungsi getAssetIcon
function getAssetIcon(assetName) {
const icons = {
'Bitcoin': 'https://logodownload.org/wp-content/uploads/2017/06/bitcoin-logo-1-1.png',
'Ethereum': 'https://clipground.com/images/ethereum-png-12.png',
'Monero': 'https://coxy.co/wp-content/uploads/2019/08/monero-logo-png-transparent-1000x1000.png',
'Rupiah': 'https://cdn2.iconfinder.com/data/icons/world-currency/512/24-1024.png'
};
return icons[assetName] || '';
}

// Update CSS untuk asset icon
const additionalStyles = `
<style>
.asset-icon {
width: 32px;
height: 32px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
overflow: hidden;
background: transparent;
}

.asset-icon img {
width: 100%;
height: 100%;
object-fit: contain;
}

@media (max-width: 768px) {
.asset-icon {
    width: 28px;
    height: 28px;
}
}
</style>
`;

// Tambahkan style ke head
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Update kode populate table
const tableBody = document.getElementById('assetsTableBody');
assets.forEach(asset => {
const percentage = ((asset.value / totalValue) * 100).toFixed(2);
const iconUrl = getAssetIcon(asset.name);

const row = document.createElement('tr');
row.innerHTML = `
<td>
    <div class="asset-name">
        <div class="asset-icon">
            <img src="${iconUrl}" alt="${asset.name} icon"/>
        </div>
        <div class="asset-details">
            <span>${asset.name}</span>
            <span class="asset-symbol">${asset.symbol}</span>
        </div>
    </div>
</td>
<td>
    <span class="asset-badge badge-${asset.type.toLowerCase()}">${asset.type}</span>
</td>
<td>
    <div class="asset-amount">
        ${asset.amount} ${asset.symbol}
    </div>
</td>
<td>
    <div class="asset-value">
        ${new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(asset.value)}
    </div>
</td>
<td>
    <div style="display: flex; align-items: center; gap: 8px;">
        <div class="percentage-bar">
            <div class="percentage-fill" 
                 style="width: ${percentage}%; background-color: ${getProgressBarColor(asset.name)}">
            </div>
        </div>
        <span>${percentage}%</span>
    </div>
</td>
`;
tableBody.appendChild(row);
});

// Fungsi untuk warna progress bar
function getProgressBarColor(assetName) {
const colors = {
'Bitcoin': '#f7931a',
'Ethereum': '#627eea',
'Monero': '#ff6600',
'Indonesian Rupiah': '#006644'
};
return colors[assetName] || '#666666';
}

// Update last updated timestamp
document.getElementById('lastUpdated').textContent = 
    new Date().toLocaleString('id-ID', {
        dateStyle: 'full',
        timeStyle: 'medium'
    });