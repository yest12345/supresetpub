#!/bin/bash

# 检查 PM2 日志和错误

echo "=== 步骤 1: 查看 PM2 错误日志 ==="
pm2 logs supreset --lines 50 --err
echo ""

echo "=== 步骤 2: 查看 PM2 输出日志 ==="
pm2 logs supreset --lines 50 --out
echo ""

echo "=== 步骤 3: 查看 PM2 详细信息 ==="
pm2 describe supreset
echo ""

echo "=== 步骤 4: 检查应用目录 ==="
cd /var/www/supreset@SODA/nextjs-mysql
echo "当前目录: $(pwd)"
echo ".next 目录: $([ -d .next ] && echo "存在" || echo "不存在")"
echo ".env 文件: $([ -f .env ] && echo "存在" || echo "不存在")"
echo ""

echo "=== 诊断完成 ==="


