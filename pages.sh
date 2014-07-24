# Siirry gh-pages branchiin
git checkout gh-pages

echo tyhjennä kansio
git rm -r .

echo kopio .gitignore
git checkout master .gitignore

echo kopio kaikki tiedostot dist-kansiosta tänne
cp -R dist/* .

echo lisää, ja committaa
git add .
git commit -m "pages"
git push --force origin gh-pages
git checkout master
