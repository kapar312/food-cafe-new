docker build . -f ./Dockerfile -t cr.yandex/crpnnia49l5u4pqegejb/fw-restaurant-admin:latest
docker login --username oauth --password AQAAAABWhXxzAATuwVcDj92_EEFLsDAj4LJQBkA cr.yandex
docker push cr.yandex/crpnnia49l5u4pqegejb/fw-restaurant-admin:latest
kubectl rollout restart deployment fw-restaurant-admin -n fw-prod