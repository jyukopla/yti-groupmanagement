package fi.vm.yti.groupmanagement.model;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public final class OrganizationListItem {

    private final UUID id;
    private final Map<String, String> name;

    public OrganizationListItem(UUID id, String nameFi, String nameEn, String nameSv) {

        HashMap<String, String> name = new HashMap<>(3);
        name.put("fi", nameFi);
        name.put("en", nameEn);
        name.put("sv", nameSv);

        this.id = id;
        this.name = name;
    }

    public UUID getId() {
        return id;
    }

    public Map<String, String> getName() {
        return name;
    }
}
