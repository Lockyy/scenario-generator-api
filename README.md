## Scenario Generator API

This API is intended to be the replacement for the backend of the website currently up at [scenariogenerator.net](http://www.scenariogenerator.net)

It allows you to specify a branching scenario and then have the generate pick a random set of results from that scenario for you.

### Example

You have a game that allows you to pick a hat, some shoes, a sword, and a shield. There are ten of each.

You create a Generator with four columns 'hat', 'shoes', 'sword', and 'shield'.
Each column is then given 10 options, each option containing one of its column's thing. So the 'hat' column would have
10 options, each with a different hat.

When you visit /api/v1/generators/1/scenario you would be given a "scenario" containing a random hat, pair of shoes, sword, and shield.

This allows users to be given a random challenge, equipment loadout, or story path to use in a game.

## TODO

- Pick whether to use a linked list for columns or a have_many.
  - Should a generator have a column that has a column etc. or should a generator have_many all of the columns (apart from option children that is)
  - The former allows more easy insertion and rearrangement of columns.
  - The latter makes the code a little easier to understand and reduces the amount of recursion going on.
  - Right now were're at a bit of a mix, a Generator can only have one column but a column can have_many columns. We need to pick one and stick to it.
- Add API endpoints for creating, editing, and deleting generators/subjects/options/columns.
- Add user login
- Add user ownership of generators
- Add tests for API endpoints
- Add more tests for Scenario::Generator
  - For when a column has multiple options
  - For when there are exclusions
- Other stuff that needs listing

## Contributing

If you want to add a new feature (not just fix a bug) please open an issue before you start working on it so we can discuss how it'll fit into the system. I'm open to suggestions and new features and it'd be great to have others input on the project.

1. Fork it ( https://github.com/lockyy/svg_fallback/fork )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Add yourself to the contributors list
5. Push to the branch (git push origin my-new-feature)
6. Create a new Pull Request

## Contributors

- [Daniel Lockhart](https://github.com/Lockyy)