Changelog
=========

To read more on Semantic Versioning, please see [specs here](http://semver.org/spec/v2.0.0.html)

## v1.2.12

### Bugfixes
- Fix search on screensizes between 768px and 992px

## v1.2.11

### Changes
- Add ellipsis to end of truncated text on desktop
- Move whole push to dockerhub build process into one file ./bin/build-and-push

### Bugfixes
- Fix width of helpful question that is after all product reviews.
- Various responsive bugfixes
- Fix Avatar component's number mode

## v1.2.10

### Changes
- Increase amount of description text that is visible on dashboard tiles

### Bugfixes
- Show full description on tag page
- Remove rating from review page
- Don't change cursor to pointer unless rating component is enabled
- Fix text overflow on Dashboard tiles
- Prevent tags from displaying that overflow Tags containe
- Remove ./tmp after building image
- Display descriptions on all tiles on mobile dashboard
- Fix sorting on tag page.

## v1.2.9

### Bugfixes
- Fix issue where multiple users could not bookmark the same product

## v1.2.8

### Bugfixes
- Fix file modal links linking to thumb instead of original file

## v1.2.7

### Bugfixes
- Fix url generation bug in Attachment.file_url

## v1.2.6

### Changes
- Increase padding between stats on reviews.
- Compress assets before sending to user using Rack::Deflater

### Bugfixes
- Fix modal title and close button on share company page.
- Fix attachment links.
- Fix product slugs in recent activity urls
- Fix urls returned from Yammer oauth api
- Add explicit primary key to collection_users to solve test issue
- Fix doubled close button on company share modal
- Fix title on company share modal

## v1.2.5

### Bugfixes
- Fix css not loading correctly on certain admin pages

## v1.2.4

### Changes
- Visually distinguish between edit and create review pages

### Bugfixes
- Fix bug where dropdown does not disappear when you select a product to review that you have already reviewed.

## v1.2.3

### Bugfixes
- Fix empty tile spot on dashboard

## v1.2.2

### Bugfixes
- Remove 3 column box on dashboard properly

## v1.2

### Features
- Add API versioning
  - The API schema now follows the pattern /api/v1/:endpoint. Future versions will iterate the version number.
- Add API for exporting collections
- Add error page for 401/404/410 errors
  - 401: Permission denied
  - 404: Not Found
  - 410: Gone
- Add asset authentication
  - All images, css, js, and attachments go through this new authentication system.
    - This does not include images, css, and js for the landing pages.
- Reorganise Dashboard
  - Move the most popular tags box up into recently added products
  - Remove 3 column box
  - Ensure recently added products is always the top box
- Process images on upload and use smaller versions of images around the site
- Add version number of site to admin page


## v1.1.2

### Features
- Highlight text in search dropdowns that matches search terms

### Changes
- Migrate from using visible-xs and hidden-xs throughout the app to using the RenderMobile and RenderDesktop components
- Add user to the Slacked message sent on Review creation
- Add private/public icons to collection page
- Change copy on /short

### Bugfix
- Fix redirect to /short when trying to access /app when not logged in
- Add swipe to dismiss to hamburger menu
- Fix sidebar overlay on mobile
- Fix bug where clicking on a related product on product page did not update reviews
- Fix TableDisplay not rendering correctly when it receives props
- Fix user profile not re-rendering correctly when the url params change. i.e. Moving from someone's profile to your own via the Hamburger menu.
- Fix redirect to /short when accessing internal content when not logged in
- Improve testing setup and coverage
- Fix RenderMobile and RenderDesktop on resized browser windows
- Fix issue with typeaheads not letting you type correctly

## v1.1.1

### Bugfix
- Change email on Internal website warning from Ed's email address to Americas.TechnologyInnovation@am.jll.com

## v1.1.0

### Features
- Adds collections. Users can now create groups of products and share them with other users.
  - Collections are created on product and user pages.
  - They are edited, added to, and deleted from the collection page.
  - Collections can be public or private as well as shared specifically with other users.
  - Collections visible to the current user are listed on user, product, and collection pages.
  - Collections added to search results.
  - More info: https://github.com/codelittinc/fletcher/wiki/Collections
- Overhauls hamburger menu. All functionality and information removed in place of dedicated links to relevant pages. Moved into react.
- Adds notification system.
  - Can be created on front or back end. Only backend are stored long term.
  - Notifications are fetched 3 at a time every 10 seconds from the backend. Frontend notifications are displayed immediately.
  - More info: https://github.com/codelittinc/fletcher/wiki/Notifications
- Support/Contact form now sends emails to Americas.TechnologyInnovation@am.jll.com
- Add Google Analytics.
- Logins now expire after 8 hours.
- Modals now handled by ModalManager system.
  - Info: https://github.com/codelittinc/fletcher/wiki/ModalManager
  - Includes Alert system. Info: https://github.com/codelittinc/fletcher/wiki/Alerts-and-Confirmations
- Add Table Display Component for easily displaying groups of data.
  - Info: https://github.com/codelittinc/fletcher/wiki/TableDisplay
- Add Decide component for handling decision inside JSX code without resorting to ternary operators or function calls.
  - Info: https://github.com/codelittinc/fletcher/wiki/Decide-Component
- Add RenderMobile and RenderDesktop components for responsive component rendering.
  - Info: https://github.com/codelittinc/fletcher/wiki/RenderDesktop-and-RenderMobile
- Add TabbedArea component.
  - Info: https://github.com/codelittinc/fletcher/wiki/TabbedArea
- Add Avatar component.
  - Info: https://github.com/codelittinc/fletcher/wiki/Avatar
- Add system for themeing the site.
  - Adds InternalIT theme.
  - Info: https://github.com/codelittinc/fletcher/wiki/Themes
- Add whitelist system for logging in users
  - Info: https://github.com/codelittinc/fletcher/wiki/Whitelist
- Add Slacked gem to log to Slack whenever a review is made.

### Changes
- Attachments now have a filetype whitelist.
  - Mimetypes whitelist viewable in app/models/attachment.rb
- Add footer to App
- Images on Dashboard no longer stretch to cover their container, they now display fully and fill the rest of their container with a stretched blurred expansion of themselves.
- ActiveAdmin header title now links to main app.
- Correct testimonials on landing page.
- Add correct Favicons.
- Going to the landing page whilst logged in redirects to /app.
- Add field validation to new review page as the user advances through fields.
- Replace old Auth Token based authentication with Devise authentication.

### Bugfixes
- Fix error messages on reviews page.
- Fix a number of issues that were generating console warnings.
- Fix welcome message not hiding when user leaves dashboard.
- Fix issue where only 4 stars showed on small/medium product boxes on dashboard.
- Fix issue with text overflow caused by long review titles.
- Various other fixes.

## v1.0.1

#### Bugfixes
- Tags no longer display when no reviews or companies are associated with them.
- Tags are now all displayed on the tags directory.
- The tag directory is now sorted alphabetically within sections.

## v1.0.0

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
