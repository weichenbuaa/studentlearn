# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import datetime
import string
import time

from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from waybackground.models import *


# Create your views here.

# @login_required
def index(request):
    contextdict = {}
    if request.user.is_authenticated():
        contextdict['username'] = request.user.username
    return render(request, 'index.html', contextdict)


# 展示登录界面
def login(request):
    return render(request, 'loginWay.html')


# 登录authentication
def authenticate_check(self, username=None, password=None):
    try:
        o = Staff.objects.get(email=username, password=password)
        return o
    except Staff.DoesNotExist:
        try:
            o = Staff.objects.get(account=username, password=password)
            return o
        except Staff.DoesNotExist:
            return None


# 去做登录，校验staff的用户名密码，
# 也可以邮箱登录
def log(request):
    username = request.POST['log_username']
    password = request.POST['log_password']
    user = authenticate_check(request, username=username, password=password)
    if user:
        login(request)
        return HttpResponseRedirect(reverse('index'))
    else:
        return render(request, 'loginWay.html', {
            'login_err': 'Please recheck your username or password !'
        })


# 旅游客户注册,是旅游的用户，但是注册到用户staff中
# 1、用户的用户名register_username就是account
# 2、旅游客户的权限，暂时直接写roleid = 0,
# 后面写好权限管理role表之后，先从客户中查找到客户role的id
# 3、last_sign_time,因为第一次注册，上次登录时间就是nowTime
def customer_register(request):
    register_username = request.POST['register_username']
    register_password = request.POST['register_password']
    register_email = request.POST['register_email']
    nowTime = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))
    staffList = Staff.objects.filter(account=register_username)
    if (len(staffList) == 0):
        staff = Staff(account=register_username, password=register_password, role_id=0,
                      last_sign_time=nowTime, create_time=nowTime, update_time=nowTime, email=register_email)
        staff.save()

    return render(request, 'loginWay.html')


# 注册时，检查用户名是不是已经存在，
# 后面看看是否去掉用户名而直接用邮箱注册
# 用户名已经存在，返回false
# 用户名不存在，返回true
@csrf_exempt
def check_username(request):
    register_username = request.POST['register_username']
    print register_username
    staffList = Staff.objects.filter(account=register_username)

    if (len(staffList) == 0):
        response_str = "true"
        return HttpResponse("%s" % response_str)
    else:
        response_str = "false"
        return HttpResponse("%s" % response_str)


# 角色列表
def role_show(request):
    roles = get_all_roles()
    return render(request, 'role_show.html', {'roles': roles})


# 创建角色界面
def role_add(request):
    return render(request, 'role_add.html')


# 创建角色执行
def role_add_do(request):
    role = request.POST['role']
    status = string.atoi(request.POST['status'])
    nowTime = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))

    roleTable = Role(role=role, status=status,
                     create_time=nowTime, update_time=nowTime)
    roleTable.save()

    roles = get_all_roles()
    return render(request, 'role_show.html', {'roles': roles})


# 系统管理、角色管理，角色编辑修改
@csrf_exempt
def role_edit(request):
    param1 = request.GET['param1']
    roles = Role.objects.filter(id=param1)
    if (len(roles) == 1):
        role = roles[0]
        dic = {'role': role}
        return render(request, 'role_edit.html', dic)
    else:
        return render(request, 'role_add.html')


# 系统管理、角色管理，
# 角色编辑修改角色执行
def role_edit_do(request):
    role_id = request.POST['role_id']
    role = request.POST['role']
    status = string.atoi(request.POST['status'])
    nowTime = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))

    try:
        roleList = Role.objects.filter(id=role_id)
        if (len(roleList) == 1):
            Role.objects.filter(id=role_id).update(role=role, status=status,
                                                  update_time=nowTime)
        elif (len(roleList) == 0):
            roleTable = Role(role=role, status=status,
                             create_time=nowTime, update_time=nowTime)
            roleTable.save()

    except Role.DoesNotExist:
        roleTable = Role(role=role, status=status,
                         create_time=nowTime, update_time=nowTime)
        roleTable.save()

    roles = get_all_roles()
    return render(request, 'role_show.html', {'roles': roles})


# 系统管理、角色管理，
# 角色删除执行，status=1是删除状态
# 根据id查找出来，status改为1
@csrf_exempt
def role_delete_do(request):
    role_id = request.POST['role_id']
    print role_id
    nowTime = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))

    try:
        roleList = Role.objects.filter(id=role_id)
        if (len(roleList) == 1):
            Role.objects.filter(id=role_id).update(status=1,update_time=nowTime)
            return HttpResponse('{"status":"success"}', content_type='application/json')
        else:
            return HttpResponse('{"status":"false"}', content_type='application/json')

    except Role.DoesNotExist:
        print 'no role to delete'
        return HttpResponse('{"status":"false"}', content_type='application/json')


# 系统管理之角色管理
# 从数据库中获取所有的role数据
# exclude一些删除数据,删除状态是status=1
def get_all_roles():
    roles = Role.objects.exclude(status=1)
    for item in roles:
        # 时间格式
        temp = item.create_time.strftime('%d/%m/%Y')
        item.create_time = temp
        temp = item.update_time.strftime('%d/%m/%Y')
        item.update_time = temp

    return roles


# 定制流程展示
def process_add(request):
    proList = CustomProcess.objects.filter(status=0).order_by('rank')
    return render(request, 'process.html', {'proList': proList})


@csrf_exempt
def process_addresult(request):
    if request.is_ajax() and request.method == 'POST':
        proList = request.POST.getlist('proList')

        for i in range(len(proList)):
            if (0 == i % 2):
                # print proList[i]
                # 值是process
                pro = CustomProcess.objects.filter(rank=i / 2 + 1)
                # 查找是否已经存在，
                nowTime = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))
                if (1 == len(pro)):
                    CustomProcess.objects.filter(rank=i / 2 + 1).update(step=proList[i], rank=i / 2 + 1,
                                                                        content=proList[i + 1],
                                                                        status=0, update_time=nowTime)
                elif (0 == len(pro)):
                    create_process = CustomProcess(step=proList[i], rank=i / 2 + 1, content=proList[i + 1],
                                                   status=0, create_time=nowTime)
                    create_process.save()
                    # 不存在，添加数据。
            else:
                print proList[i]

    return HttpResponse('{"status":"success"}', content_type='application/json')


@csrf_exempt
def process_show(request):
    # 从数据库中获取已经存在的流程数据，将数据在传递到前端界面
    proList = CustomProcess.objects.filter(status=0).order_by('rank')
    return render(request, 'process_show.html', {'proList': proList})


# 旅游客户信息管理
def customer_add(request):
    partner = CustomerPartener.objects.all().order_by('partner')
    l = []
    for p in partner:
        l.append(p.values)
    dic = {'partner': l}
    return render(request, 'customer_add.html', dic)


# 旅游客户信息管理(添加和编辑都在这个函数里)
def customer_add_result(request):
    customer_id = request.POST['customer_id']
    name = request.POST['name']
    mobile = request.POST['mobile']
    email = request.POST['email']
    wechat = request.POST['wechat']
    qq = request.POST['qq']
    destination = request.POST['destination']
    start_date = datetime.datetime.strptime(request.POST['start_date'], '%d/%m/%Y').date()
    end_date = datetime.datetime.strptime(request.POST['end_date'], '%d/%m/%Y').date()
    days = request.POST['days']
    partner = request.POST['partner']
    peoples = request.POST['peoples']
    budget = request.POST['budget']
    air_tickets = string.atoi(request.POST['air_tickets'])
    visa = string.atoi(request.POST['visa'])
    context = request.POST['context']
    nowTime = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))

    print customer_id
    print name
    print mobile
    print email
    print wechat
    print qq
    print destination
    print start_date
    print end_date
    print days
    print partner
    print peoples
    print budget
    print air_tickets
    print visa
    print context

    customerList = Customer.objects.filter(id=customer_id)
    if (len(customerList) == 0):
        customer = Customer(name=name, mobile=mobile, email=email, wechat=wechat, qq=qq,
                            destination=destination, start_date=start_date, end_date=end_date,
                            days=days, partner=partner, peoples=peoples, budget=budget,
                            air_tickets=air_tickets, visa=visa, context=context,
                            create_time=nowTime, status=0)
        customer.save()
    elif (len(customerList) == 1):
        Customer.objects.filter(id=customer_id).update(name=name, mobile=mobile, email=email, wechat=wechat, qq=qq,
                                                       destination=destination, start_date=start_date,
                                                       end_date=end_date,
                                                       days=days, partner=partner, peoples=peoples, budget=budget,
                                                       air_tickets=air_tickets, visa=visa, context=context,
                                                       update_time=nowTime, status=0)

    custermers = get_all_customers()
    return render(request, 'customer_show.html', {'custermers': custermers})


# 旅游客户信息管理
# 从数据库中获取所有的customer数据
def get_all_customers():
    custermers = Customer.objects.filter(status=0).order_by('create_time')
    for item in custermers:
        # 时间格式
        temp = item.start_date.strftime('%d/%m/%Y')
        item.start_date = temp
        temp = item.end_date.strftime('%d/%m/%Y')
        item.end_date = temp
        # partner列表转成文本格式
        p = CustomerPartener.objects.filter(partner=item.partner)
        if (len(p) == 1):
            item.partner = p[0].values
        # 是否需要机票和签证
        air = System.objects.filter(site_key=item.air_tickets)
        if (len(air) == 1):
            item.air_tickets = air[0].site_value
        v = System.objects.filter(site_key=item.visa)
        if (len(v) == 1):
            item.visa = v[0].site_value

    return custermers


# 旅游客户信息管理
# 从数据库中获取customer对应的所有的partner数据
def get_customer_partner():
    partner = CustomerPartener.objects.all().order_by('partner')
    l = []
    for p in partner:
        l.append(p.values)
    return l


# 旅游客户信息管理
def customer_show(request):
    custermers = get_all_customers()
    return render(request, 'customer_show.html', {'custermers': custermers})


# 旅游客户信息管理
@csrf_exempt
def customer_edit(request):
    param1 = request.GET['param1']
    customers = Customer.objects.filter(id=param1, status=0)
    if (len(customers) == 1):
        customer = customers[0]
        # 时间格式
        temp = customer.start_date.strftime('%d/%m/%Y')
        customer.start_date = temp
        temp = customer.end_date.strftime('%d/%m/%Y')
        customer.end_date = temp

    dic = {'customer': customer}
    dic['partner'] = get_customer_partner()

    return render(request, 'customer_add.html', dic)
