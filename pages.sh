# Siirry gh-pages branchiin
git stash
git checkout gh-pages
git pull origin gh-pages

echo tyhjennä kansio
git rm -r .

echo kopio .gitignore
git checkout master .gitignore

echo kopio kaikki tiedostot dist-kansiosta tänne
cp -R dist/* .

echo lisää, ja committaa
git add .
git commit -m "pages"
git push origin gh-pages
git checkout master
