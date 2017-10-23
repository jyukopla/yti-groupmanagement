package fi.vm.yti.groupmanagement.util;

import java.util.Collection;

public final class CollectionUtil {

    public static <T> T requireSingle(Collection<T> items) {
        if (items.size() != 1) {
            throw new RuntimeException("Expecting single item, was: " + items.size());
        }

        return items.iterator().next();
    }


    private CollectionUtil() {
    }
}
