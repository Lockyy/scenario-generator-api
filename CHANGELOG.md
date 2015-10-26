Changelog
=========

To read more on Semantic Versioning, please see [specs here](http://semver.org/spec/v2.0.0.html)


### v1.1.1

####Bugfixes
- Hamburger menu now scrolls independently of the main page

### v1.1.0

####Features
- Add collections. A user can create a group of products with a name and description.
  - Collections can be added, edited, and created on a user's profile, a product's page, or the collection's dedicated page.
  - Collections appear on the user page collections tab.
  - Collections can be private or public.
  - If public, collections appear on the product's collections tab.
    - Collection visibility can be changed via dropdown on collection box.
  - After creation user is asked to share collection with other users.
  - Shared, public, and owned collections visible on product/user/collection pages.
  - Emails are sent to the user who has a collection shared with them.
- Add user search API endpoint for use with collection sharing. Will also be used for product sharing.
- Add notifications system.
  - Notifications can be generated on either the frontend or backend.
    - Frontend notifications are not stored in the database and are purely alerts to tell the user that a save succeeded etc.
    - Notifications generated on the front end are created via FluxNotificationsActions.showNotification
    - Notifications generated on the back end are automatically fetched by the front end and displayed 3 at a time every 10 seconds.
  - Uses https://github.com/igorprado/react-notification-system module for displaying notifications.
- Support/Contact form now correctly sends emails to Americas.TechnologyInnovation@am.jll.com
  - We now have a mandrill subaccount set up for sending emails. Can use this for sharing products later.
- Add google analytics to site and app
- Logins now expire after 8 hours.

####Changes
- Images on the dashboard are no longer stretched to their container, they now maintain their original aspect ratio and the rest of the container is filled with a blurred, expanded version of the image. Background image is semi-transparent.
- ActiveAdmin header title now links to the main app.
- Landing page now displays correct testimonials.
- Add correct favicons.
- Ensure all required fields on reviews page have error messages when left blank.
- Hitting the landing page whilst logged in automatically redirects the user to /app.
- Field validation now occurs on new review page for fields preceeding the one clicked by the user. Errors also now appear at the end of the form.

####Bugfixes
- Fix a number of issues that were generating console warnings related to interated components not having unique IDs.
- Ensure welcome message is hidden when the user leaves the dashboard.
- Add icon for collections to sidebar on product and user page.
- Remove horizontal scrollbar from collection creation window.

### v1.0.0

####Features
- User login via Yammer
- Landing page with placeholder testimonials and non-functional support form
- Products can be added by entering the product's name on the new review page
- Companies can be added by entering the new company's name after entering a new product on the new review page
- Reviews can be added for new and existing products.
- Review page product/company fields have typeahead to allow user to easily choose which product to review.
- User can start a review for a product directly from the product's page.
- A review has star and text ratings for both price and quality.
- Reviews can be rated helpful/not-helpful by other users.
- Reviews can be sorted by helpfulness/age/rating.
- Products can have files and links attached to them via reviews.
- Product page displays files, links, reviews, description, tags.
- Product can be given tags via reviews
- Tag directory implemented
- User can follow tags.
- User page added that lists user's reviews and data.
- Dashboard displays most recent products and reviews, most popular products and tags, and products based on user's followed tags.
- Dashboard displays most popular tags
- User can bookmark products
- Search page implemented
- Search dropdown from header bar implemented
- Search page sorting implemented
- Hamburger menu displays followed tags, bookmarked products, and user's recent reviews.
- User can edit followed tags from hamburger menu.
- User can get a share link for products from the product page's share button.
- User can add tags directly to a company.
- Company page displays a company's products.
- Product page displays related products.