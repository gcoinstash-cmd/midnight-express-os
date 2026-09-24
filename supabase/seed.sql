-- MIDNIGHT EXPRESS OS — Seed Data
INSERT INTO menu_items (item_code, title, sub_title, price, calories, prep_seconds, spice_tier, category, image_url) VALUES
('WAGYU-WOK', 'Triple Wagyu Smashed Wok', 'A5 Miyazaki Wagyu, Charred Scallion, Tare Glaze', 26.50, 780, 160, 2, 'WOK_SIGNATURE', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'),
('KUROBUTA-BOWL', 'Kurobuta Pork Belly Bowl', 'Twice-cooked pork belly with Sichuan peppercorn crunch', 22.00, 840, 180, 3, 'WOK_CLASSIC', 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80'),
('GHOST-WINGS', 'Midnight Ghost Pepper Wings', 'Smoked crispy wings tossed in house fermented ghost chili oil', 18.50, 620, 140, 4, 'DROPS_STREET', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80')
ON CONFLICT (item_code) DO NOTHING;

INSERT INTO lanes (lane_code, name, sensors_active, current_vehicle, avg_wait_seconds) VALUES
('LANE-01', 'Supercar Lane 1 (Low Clearance)', true, 'Porsche 911 GT3 RS', 45),
('LANE-02', 'Priority Lane 2 (RFID Express)', true, 'Nissan GT-R Nismo', 75),
('LANE-03', 'Mobile Dispatch Lane 3', true, 'Audi RS6 Avant', 110)
ON CONFLICT (lane_code) DO NOTHING;

INSERT INTO orders (order_id, vehicle_plate, vehicle_class, lane, items, total_amount, status) VALUES
('EXP-401', 'CA 9GT3RS', 'SUPERCAR', 'Supercar Lane 1', '[{"title":"Triple Wagyu Smashed Wok","qty":1}]', 26.50, 'ready-window'),
('EXP-402', 'NV GODZLA', 'TUNER', 'Priority Lane 2', '[{"title":"Kurobuta Pork Belly Bowl","qty":1}]', 22.00, 'wok-searing')
ON CONFLICT (order_id) DO NOTHING;
