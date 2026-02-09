#!/bin/bash

# 修复 ECS 下载问题脚本

echo "=== 步骤 1: 检查文件是否存在 ==="
cd /var/www/supreset@SODA/nextjs-mysql

# 检查上传目录
echo "检查上传目录："
ls -la public/uploads/presets/ | head -10
echo ""

# 检查文件数量
echo "预设文件数量："
find public/uploads/presets -type f | wc -l
echo ""

echo "=== 步骤 2: 检查文件权限 ==="
# 设置正确的权限
chmod -R 755 public/uploads/
chown -R $USER:$USER public/uploads/
echo "✅ 权限已设置"
echo ""

echo "=== 步骤 3: 检查 Nginx 配置 ==="
echo "当前 Nginx 配置："
sudo cat /etc/nginx/sites-available/supreset | grep -A 5 "location /uploads"
echo ""

echo "=== 步骤 4: 测试文件访问 ==="
# 获取一个示例文件路径
SAMPLE_FILE=$(find public/uploads/presets -type f | head -1)
if [ -n "$SAMPLE_FILE" ]; then
    echo "示例文件: $SAMPLE_FILE"
    echo "文件大小: $(ls -lh "$SAMPLE_FILE" | awk '{print $5}')"
    echo "文件权限: $(ls -l "$SAMPLE_FILE" | awk '{print $1}')"
else
    echo "⚠️ 未找到示例文件"
fi
echo ""

echo "=== 步骤 5: 检查 Nginx 错误日志 ==="
echo "最近的 Nginx 错误（如果有）："
sudo tail -20 /var/log/nginx/error.log | grep -i "uploads\|404" || echo "无相关错误"
echo ""

echo "=== 诊断完成 ==="
echo ""
echo "请将以上输出发送给我，我会帮你修复 Nginx 配置"


