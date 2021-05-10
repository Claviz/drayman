ng generate application $1 --prefix=drayman --style=scss --routing=false
ng add @angular/elements --project=$1
ng generate component $1 --project=$1
rm -rf ./projects/$1/e2e ./projects/$1/src/app/app.component.* ./projects/$1/karma.conf.js ./projects/$1/src/test.ts
sed -e "s/\${kebab-case}/$1/g" -e "s/\${pascal-case}/$2/g" ./element-generator/app.module.txt > ./projects/$1/src/app/app.module.ts
sed -i "s/drayman-$1/drayman-$1-internal/g" ./projects/$1/src/app/$1/$1.component.ts
sed -i "s/<drayman-root><\/drayman-root>/<drayman-$1><\/drayman-$1>/g" ./projects/$1/src/index.html
sed -i "s/@angular-devkit\/build-angular:browser/ngx-build-plus:browser/g" ./angular.json
sed -i "s/@angular-devkit\/build-angular:dev-server/ngx-build-plus:dev-server/g" ./angular.json
sed -i "s/AppModule/${2}Module/g" ./projects/$1/src/main.ts
cp -f ./element-generator/tsconfig.app.txt ./projects/$1/tsconfig.app.json
