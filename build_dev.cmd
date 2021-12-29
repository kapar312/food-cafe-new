docker build . -f ./Dockerfile -t cr.yandex/crpnnia49l5u4pqegejb/fw-restaurant-admin:latest_dev
docker login --username oauth --password AQAAAABWhXxzAATuwVcDj92_EEFLsDAj4LJQBkA cr.yandex
docker push cr.yandex/crpnnia49l5u4pqegejb/fw-restaurant-admin:latest_dev
kubectl rollout restart deployment fw-restaurant-admin -n fw-dev