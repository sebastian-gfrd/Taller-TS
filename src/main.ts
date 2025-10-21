import { Serie } from "./Serie.js";
import { series } from "./data.js";

const seriesTbody: HTMLElement = document.querySelector('#series-table tbody')!;
const tableFooter: HTMLElement = document.getElementById('table-footer')!;
const seriesDetailContainer: HTMLElement = document.getElementById('series-detail-card')!;

function renderSeriesInTable(seriesList: Serie[]): void {
    seriesList.forEach(serie => {
        let trElement = document.createElement("tr");
        
        trElement.innerHTML = `
            <td>${serie.id}</td>
            <td><a href="#" id="serie-${serie.id}" class="series-name-link">${serie.name}</a></td> 
            <td>${serie.channel}</td>
            <td>${serie.seasons}</td>
        `;
        seriesTbody.appendChild(trElement);

        const linkElement = trElement.querySelector(`#serie-${serie.id}`);
        if (linkElement) {
            linkElement.addEventListener('click', (event) => {
                event.preventDefault(); 
                renderSeriesDetail(serie); 
            });
        }
    });
}

function calculateAverageSeasons(seriesList: Serie[]): number {
    let totalSeasons: number = 0;
    seriesList.forEach(serie => {
        totalSeasons += serie.seasons;
    });
    return totalSeasons / seriesList.length;
}

function displaySeasonsAverage(seriesList: Serie[]): void {
    const average = calculateAverageSeasons(seriesList);
    const trElement = document.createElement("tr");
    trElement.innerHTML = `
        <td colspan="4">Seasons average: ${average.toFixed(2)}</td>
    `;
    tableFooter.appendChild(trElement);
}
function renderSeriesDetail(serie: Serie): void {
    seriesDetailContainer.innerHTML = ''; 

    seriesDetailContainer.innerHTML = `
        <div class="card">
            <img class="card-img-top" src="${serie.image}" alt="${serie.name}">
            <div class="card-body">
                <h4 class="card-title">${serie.name}</h4>
                <p class="card-text">${serie.description}</p>
                <a href="${serie.webpage}" target="_blank">${serie.webpage}</a>
            </div>
        </div>
    `;
}


renderSeriesInTable(series);
displaySeasonsAverage(series);
