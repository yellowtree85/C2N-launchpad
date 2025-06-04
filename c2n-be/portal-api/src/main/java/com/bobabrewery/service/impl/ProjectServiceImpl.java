package com.bobabrewery.service.impl;

import com.bobabrewery.repo.common.model.ProductPO;
import com.bobabrewery.repo.common.model.Project;
import com.bobabrewery.repo.common.mapper.ProductContractMapper;
import com.bobabrewery.service.IProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author yunmengmeng
 * @since 2022-01-13
 */
@Service
@RequiredArgsConstructor//Lombok 会为你自动生成一个构造函数，该构造函数包含所有：final 修饰的字段 或者使用了 @NonNull 注解的字段
public class ProjectServiceImpl implements IProjectService {

    private final ProductContractMapper mapper;

    @Override
    public Project getById(Integer id) {
        return mapper.getById(id);
    }

    @Override
    public boolean updateById(Project entity) {
        Assert.notNull(entity.getId(), "error: entityId must not be null");
        return mapper.updateById(entity);
    }

    @Override
    public List<Project> list() {
        return mapper.list();
    }

    @Override
    public void updateByProduct(ProductPO params) {
        mapper.updateByProduct(params);
    }

    @Override
    public List<Project> selectNotEndProduct() {
        return this.mapper.selectNotEndProduct();
    }

    @Override
    public void updateStatus(Integer status, Integer id) {
        mapper.updateStatus(status, id);
    }
}
