# AgriBridge DPL - Development Checklist

## Main Website

### Home
- [ ] Hero section with mission statement and 'Sell Produce' / 'Buy Produce' buttons
- [ ] Featured surplus produce cards pulled from live listings
- [ ] Impact stats strip (kg saved, active sellers, buyers)
- [ ] Footer with page links, contact info, social links

### About Us
- [ ] Write startup story, mission and goals
- [ ] Explain the food-waste problem and how AgriBridge reduces it
- [ ] Add team section with photos and roles
- [ ] Add partners / impact section

### Marketplace (public view)
- [ ] Product grid showing photo, name, price, quantity, expiry badge
- [ ] Loading, empty and error states
- [ ] Pagination or infinite scroll
- [ ] 'Log in to order' prompt for visitors

### How It Works
- [ ] Write seller steps: list, confirm order, deliver/pickup, get paid
- [ ] Write buyer steps: browse, order, message, receive
- [ ] Add icons or illustrations per step
- [ ] Add FAQ section

### Login / Register
- [ ] Role choice screen (Seller or Buyer)
- [ ] Registration forms: business name, type, phone, email, location, password
- [ ] Login with validation and clear error messages
- [ ] Forgot / reset password flow
- [ ] Email or phone verification

### Contact Us
- [ ] Contact form (name, email, subject, message) saved to database
- [ ] Email notification to admin on submission
- [ ] Show phone, email, address and map
- [ ] Success and error confirmation messages

### Navigation Menu
- [ ] Header links: Home, Marketplace, How It Works, About Us, Login/Register
- [ ] Mobile hamburger menu
- [ ] Role-based menu after login (dashboard, logout)
- [ ] Highlight the active page

## Seller Portal

### Seller Dashboard
- [ ] Summary cards: active listings, pending orders, total sales
- [ ] Recent orders list
- [ ] Alerts for items nearing expiry
- [ ] Quick 'Add Produce' button

### My Produce Listings
- [ ] List all listings with status (active, sold, expired)
- [ ] Edit listing details
- [ ] Delete or deactivate a listing
- [ ] Auto-mark listings expired when shelf life ends

### Add Produce
- [ ] Form fields: name, category, quantity, unit, condition, location, price, shelf life
- [ ] Photo upload with preview, size limit and compression
- [ ] Field validation and required checks
- [ ] Save as draft or publish
- [ ] Pricing suggestion shown while entering price

### Orders Received
- [ ] Order list filtered by status (pending, confirmed, completed, cancelled)
- [ ] Order detail page with buyer info and items
- [ ] Accept / decline buttons
- [ ] Notify buyer on status change
- [ ] Reduce stock automatically on confirmation

### Messages
- [ ] Inbox with conversations per buyer
- [ ] Chat view with send and timestamp
- [ ] Link a conversation to a listing or order
- [ ] Unread badge and notifications

### Sales and Earnings
- [ ] Completed sales table
- [ ] Revenue totals by day, week, month
- [ ] Chart of earnings over time
- [ ] Export report to CSV

### Delivery Management
- [ ] Choose pickup or delivery per order
- [ ] Enter pickup time/location or delivery details
- [ ] Update delivery status
- [ ] Assign a delivery partner if applicable

### Seller Profile
- [ ] Edit business info, logo and contact
- [ ] Change password and account settings
- [ ] Show verification status
- [ ] Notification preferences

## Buyer Portal

### Buyer Dashboard
- [ ] Recent orders and their status
- [ ] Recommended or newly added produce
- [ ] Unread messages indicator
- [ ] Saved suppliers or favourites

### Browse Marketplace
- [ ] Product grid with discount and expiry labels
- [ ] Sort by price, newest, nearest, expiring soon
- [ ] Responsive card layout
- [ ] Add to order / request button

### Search and Filter
- [ ] Keyword search
- [ ] Filters: category, price range, quantity, location
- [ ] Clear-filters control
- [ ] Remember filter choices during session

### Product Details
- [ ] Photos, condition, shelf life and price
- [ ] Seller info and rating
- [ ] Available quantity and order quantity selector
- [ ] 'Message seller' and 'Place order' buttons

### My Orders
- [ ] Tabs for pending, confirmed, completed
- [ ] Order detail with timeline
- [ ] Cancel order before confirmation
- [ ] Reorder button and receipt view

### Messages
- [ ] Inbox and chat view shared with seller module
- [ ] Negotiate price / quantity in thread
- [ ] Notifications for new replies

### Pickup and Delivery
- [ ] Select pickup or delivery at checkout
- [ ] Enter delivery address or choose pickup slot
- [ ] Track delivery status
- [ ] Confirm receipt of goods

### Buyer Profile
- [ ] Edit business details and address
- [ ] Business type and preferences
- [ ] Change password
- [ ] Order and notification settings

## Admin Panel

### Admin Dashboard
- [ ] Totals: users, listings, orders, revenue
- [ ] Pending verifications and complaints widgets
- [ ] Recent activity feed
- [ ] Admin-only login and access control

### User and Account Management
- [ ] List and search all users
- [ ] View user details
- [ ] Suspend, reactivate or delete accounts
- [ ] Role management

### Supplier Verification
- [ ] Queue of sellers awaiting approval
- [ ] View submitted documents
- [ ] Approve or reject with reason
- [ ] Email the seller the decision

### Produce Listing Management
- [ ] View all listings
- [ ] Edit, hide or remove inappropriate listings
- [ ] Flag suspicious prices or photos

### Order and Transaction Monitoring
- [ ] All orders table with filters
- [ ] Order detail view
- [ ] Handle disputes and cancellations
- [ ] Transaction history

### Delivery Partner Management
- [ ] Add and edit delivery partners
- [ ] Assign partners to orders
- [ ] Track delivery performance

### Reports and Complaints
- [ ] Complaint inbox from buyers and sellers
- [ ] Assign status (open, in review, resolved)
- [ ] Reply to the complainant
- [ ] Log of actions taken

### Analytics and Reports
- [ ] Charts: sales, users, food saved
- [ ] Top products and categories
- [ ] Date-range filter
- [ ] Export reports to CSV or PDF

## Shared Platform Features

### Order Management
- [ ] Define order statuses and allowed transitions
- [ ] Order database tables and APIs
- [ ] Stock check to prevent overselling
- [ ] Order confirmation emails to both sides

### Pickup and Delivery
- [ ] Shared logic for pickup slots and delivery addresses
- [ ] Status updates visible to buyer, seller and admin
- [ ] Delivery fee handling if needed

### Messaging and Notifications
- [ ] Real-time or polling-based chat backend
- [ ] In-app notification bell
- [ ] Email / SMS alerts for orders and messages
- [ ] User notification settings

### Surplus Pricing Suggestions
- [ ] Decide pricing rule (discount by days to expiry and condition)
- [ ] Build suggestion function or formula
- [ ] Show suggested price on Add Produce form
- [ ] Let sellers override the suggestion

## Before Launch

### Database and Authentication
- [ ] Design database schema (users, listings, orders, messages, complaints)
- [ ] Set up secure login with password hashing and sessions/tokens
- [ ] Role-based access: seller, buyer, admin
- [ ] Set up image storage and daily backups

### Security and Legal
- [ ] HTTPS and input validation
- [ ] Protect against SQL injection and XSS
- [ ] Terms of Service and Privacy Policy pages
- [ ] Cookie / data consent notice

### Mobile Responsiveness
- [ ] Test all pages on phone, tablet and desktop
- [ ] Fix tap targets, forms and tables on small screens
- [ ] Test on Chrome, Safari and Firefox

### Testing
- [ ] Create test seller, buyer and admin accounts
- [ ] Run full flow: list, order, message, deliver, complete
- [ ] Fix bugs found
- [ ] Pilot with real sellers and buyers and collect feedback

### Hosting and Domain
- [ ] Choose hosting provider
- [ ] Buy and connect domain
- [ ] Set up SSL certificate
- [ ] Deploy, set up error monitoring, and do a final check
