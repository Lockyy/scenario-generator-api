# QA and release processes

## New Features

1. Branch develop into feature/<feature-name>.
2. Make changes.
3. Add changes made to CHANGELOG.md
4. Write new tests covering new features, or update tests to cover any changes you have made.
5. Ensure all tests are passing.
6. If develop has advanced beyond your current work, rebase your branch onto develop, fix any conflicts, and ensure everything is still working and tests are passing.
7. Make a PR on Github merging the branch back into develop.
8. Have the PR reviewed by someone else and have them merge things in.

## QA

Whether you are QAing a new release or just a new feature prior to merging it in, it is ideal to push the branch/release candidate up to fletcher.codelitt.com. The instructions of which are found in https://docs.google.com/document/d/184z3c3YsvQseLvsu40fTPh0ngZvDNgr4z21xPUsdXH8/edit#heading=h.ydwc5376i0nn.

## Releasing a new version of Fletcher

Once all the features to be included in a version of Fletcher have been merged into develop it is time to create a release candidate.

1. Make a new branch off of develop called release/<major>.<minor>.<patch>. And start the next version number in CHANGELOG.md for any future branches being merged in.
2. Ensure all tests are passing.
3. Push this branch up to the QA server, as detailed in the doc in the section above.
4. Have site QA'd for functionality and design.
5. If any bugs/issues are found branch off of the release branch, fix the issues and have the changes merged back into the release branch. Return to step 3. If no bugs/issues are found, proceed to step 6.
6. Push the site to qa.fletcher.mx. Details for this are also found in the server doc.
7. Have final release candidate QA'd and approved by Ed.
8. Follow step 5, if any bugs are found. If not, go to step 9.
9. Push new release to the live server. Details for doing this are in the server doc.
10. Merge the release branch back into develop.

## Weekly processes

- Load testing