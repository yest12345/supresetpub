#!/usr/bin/env bash
set -euo pipefail

CNF="$(cd "$(dirname "$0")" && pwd)/local-mysql.cnf"
MYSQL_BIN="/usr/local/mysql/bin"
DATA_DIR="/Users/shati/tmp/supreset-mysql-data"

if [ ! -x "$MYSQL_BIN/mysqld" ]; then
  echo "未找到 /usr/local/mysql，请先安装 MySQL。"
  exit 1
fi

if [ ! -d "$DATA_DIR/mysql" ]; then
  echo "首次初始化本地数据库目录: $DATA_DIR"
  "$MYSQL_BIN/mysqld" --defaults-file="$CNF" --initialize-insecure
fi

if "$MYSQL_BIN/mysql" --defaults-file="$CNF" -u root -e "SELECT 1" >/dev/null 2>&1; then
  echo "本地 MySQL 已在运行 (3307)"
else
  echo "启动本地 MySQL (3307)..."
  mkdir -p "$(dirname "$DATA_DIR")"
  LOG_FILE="${DATA_DIR}/server.log"
  "$MYSQL_BIN/mysqld" --defaults-file="$CNF" --daemonize --log-error="$LOG_FILE"
  sleep 3
fi

"$MYSQL_BIN/mysql" --defaults-file="$CNF" -u root -e "CREATE DATABASE IF NOT EXISTS supreset CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
echo "✅ 本地数据库就绪: mysql://root@127.0.0.1:3307/supreset"
