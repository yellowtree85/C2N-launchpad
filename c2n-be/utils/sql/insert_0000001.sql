DELETE FROM product_contract WHERE id = 1;
INSERT INTO product_contract (`id`,`name`,`description`,`img`,`twitter_name`,`status`,`amount`, `sale_contract_address`, `token_address`,`payment_token`,`follower`,`tge`, `project_website`,`about_html`,`registration_time_starts`,`registration_time_ends`,`sale_start`,`sale_end`,`max_participation`, `token_price_in_PT`,`total_tokens_sold`,`amount_of_tokens_to_sell`,`total_raised`,`symbol`,`decimals`,`unlock_time`,`medias`, `number_of_registrants`,`vesting`,`tricker`,`token_name`,`roi`,`vesting_portions_unlock_time`,`vesting_percent_per_portion`, `create_time`,`update_time`,`type`,`card_link`,`tweet_id`,`chain_id`,`payment_token_decimals`,`current_price`) VALUES (1,'pcontract_1','pcontract_1 desc','/img/pc_1.jpg','david_1',0,'10000000000000000000000', '0x3B02fF1e626Ed7a8fd6eC5299e2C54e1421B626B', '0x9A676e781A523b5d0C0e43731313A708CB607508','200',0,'2025-06-01 02:17:43', 'http://404.com','http://404.com/about.html','2025-05-30 22:31:03','2025-05-30 23:01:03','2025-05-30 23:31:03','2025-05-31 23:31:03','10', '100000000000','1','30','111','MCK',18,'2025-06-01 02:17:43',NULL, 1,NULL,NULL,'DemoToken1','1',NULL,NULL, NOW(),NOW(),0,'http://card_link_1.com','tweet_id_1',31337,18,0);



| 字段名                            | 值（对应数据）                                        |
| ------------------------------ | ---------------------------------------------- |
| `id`                           | 1                                              |
| `name`                         | `'pcontract_1'`                                |
| `description`                  | `'pcontract_1 desc'`                           |
| `img`                          | `'/img/pc_1.jpg'`                              |
| `twitter_name`                 | `'david_1'`                                    |
| `status`                       | 0                                              |
| `amount`                       | `'10000000000000000000000'`                    |
| `sale_contract_address`        | `'0x3B02fF1e626Ed7a8fd6eC5299e2C54e1421B626B'` |
| `token_address`                | `'0x9A676e781A523b5d0C0e43731313A708CB607508'` |
| `payment_token`                | `'200'`                                        |
| `follower`                     | 0                                              |
| `tge`                          | `'2025-06-01 02:17:43'`                        |
| `project_website`              | `'http://404.com'`                             |
| `about_html`                   | `'http://404.com/about.html'`                  |
| `registration_time_starts`     | `'2025-05-30 22:31:03'`                        |
| `registration_time_ends`       | `'2025-05-30 23:01:03'`                        |
| `sale_start`                   | `'2025-05-30 23:31:03'`                        |
| `sale_end`                     | `'2025-05-31 23:31:03'`                        |
| `max_participation`            | `'10'`                                         |
| `token_price_in_PT`            | `'100000000000'`                               |
| `total_tokens_sold`            | `'1'`                                          |
| `amount_of_tokens_to_sell`     | `'30'`                                         |
| `total_raised`                 | `'111'`                                        |
| `symbol`                       | `'MCK'`                                        |
| `decimals`                     | 18                                             |
| `unlock_time`                  | `'2025-06-01 02:17:43'`                        |
| `medias`                       | `NULL`                                         |
| `number_of_registrants`        | 1                                              |
| `vesting`                      | `NULL`                                         |
| `tricker`                      | `NULL`                                         |
| `token_name`                   | `'DemoToken1'`                                 |
| `roi`                          | `'1'`                                          |
| `vesting_portions_unlock_time` | `NULL`                                         |
| `vesting_percent_per_portion`  | `NULL`                                         |
| `create_time`                  | `NOW()`                                        |
| `update_time`                  | `NOW()`                                        |
| `type`                         | 0                                              |
| `card_link`                    | `'http://card_link_1.com'`                     |
| `tweet_id`                     | `'tweet_id_1'`                                 |
| `chain_id`                     | 31337                                          |
| `payment_token_decimals`       | 18                                             |
| `current_price`                | 0                                              |
