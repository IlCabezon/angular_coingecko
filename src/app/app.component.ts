import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  coins: Array<Coin> = [];
  filteredCoins: Array<Coin> = [];
  titles: Array<string> = ['#', 'Coin', 'Price', 'Price Change', '24 Volume'];
  searchText = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<Array<Coin>>(`http://${window.location.hostname}:3000/coins`)
      .subscribe((res) => {
        this.coins = res;
        this.filteredCoins = res;
      });
  }

  searchCoin(): void {
    if (!this.searchText.trim()) this.filteredCoins = this.coins;

    this.filteredCoins = this.coins.filter(
      (coin) =>
        coin.name
          .toLocaleLowerCase()
          .includes(this.searchText.toLocaleLowerCase()) ||
        coin.symbol.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
