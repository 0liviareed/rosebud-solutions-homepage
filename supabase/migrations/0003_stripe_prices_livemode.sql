-- stripe_prices: hold the TEST and LIVE catalogues side by side, so preview/testing
-- keeps working on test keys while production runs on live keys. The session route
-- picks rows matching the current key's mode (sk_live_ → livemode = true).

alter table stripe_prices add column if not exists livemode boolean not null default false;

-- Everything created so far was made with a TEST key.
update stripe_prices set livemode = false;

-- Re-key so a given (product, cycle) can have both a test and a live price id.
alter table stripe_prices drop constraint stripe_prices_pkey;
alter table stripe_prices add primary key (product, cycle, livemode);
