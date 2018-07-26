# onepanel
## Portfolio management using horoscopes
horoscope+allocations.ipynb
Fairly straightforward, just run through the notebook. If the scraping crashes the notebook, just refresh it and restart whatever block failed. Cell 10 is where the stocks are defined. If you want to swap out for different tickers, there are plenty to choose from.

## Predicting stock performance based on CEO pictures
### Step 1:
Run CEO+stock+scraping.ipynb to get the stock performances we'll be predicting.
### Step 2:
Run scraper/CEO image scraping.ipynb to scrape all the photos of the CEOs.
### Step 3:
Run CEO+training.ipynb to train the model for predicting performance based on CEO photos.
